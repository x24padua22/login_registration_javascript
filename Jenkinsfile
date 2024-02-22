void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/x24padua22/login_registration_javascript.git"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
} 

applicationIPAddress= "13.250.220.14"
sourceBranch = ghprbSourceBranch
targetBranch = ghprbTargetBranch

pipeline {
    agent any
    //tools { nodejs "NodeJS" }
    
    stages {
        stage('Deploy Sample Instance') {
            steps {
                script {
                    Integer port = 3000
                    String directory = "/var/www/sample_login"
                    String staging_env = "staging_env"

                    echo "port is ${port}"
                    echo "directory is ${directory}"
                    echo "staging_env is ${staging_env}"

                    withCredentials([sshUserPrivateKey(credentialsId: "sshadmin", keyFileVariable: 'SSH_KEY')]) {
                        def remote = [
                            name: 'ubuntu',
                            port: 22,
                            allowAnyHosts: true,
                            host: "${applicationIPAddress}",
                            user: "ubuntu",
                            identityFile: SSH_KEY
                        ]

                        echo "Fetch branch and checkout to change branch"
                        sshCommand remote: remote, command: "cd ${directory} && sudo git fetch"
                        sshCommand remote: remote, command: "cd ${directory} && sudo git checkout ${sourceBranch}"
                        sshCommand remote: remote, command: "cd ${directory} && sudo git pull origin ${sourceBranch}"
                        
                        /* /////////
                        echo "Add the BE yml file"
                        withCredentials([file(credentialsId: lp3_backend_yml, variable: 'yaml_file')]) {
                            sh 'mv \$yaml_file ./src/web-backend/server/config'
                            sshPut remote: remote, from: "./src/web-backend/server/config/staging${staging_number}.env.yml", into: "/var/www/tmp_server_files/loginstaging${staging_number}.codingdojo.com/"
                        }
                        
                        sshCommand remote: remote, command: "sudo rm -rf ${cd_directory}/src/web-backend/server/config/staging${staging_number}.env.yml"
                        sshCommand remote: remote, command: "sudo mv /var/www/tmp_server_files/loginstaging${staging_number}.codingdojo.com/staging${staging_number}.env.yml ${cd_directory}/src/web-backend/server/config/"

                        echo "Start Unit Test"
                            // sshCommand remote: remote, command: "cd ${cd_directory}/src/web-backend && sudo NODE_ENV=staging${staging_number} NODE_WORKSPACE=codingdojo ./node_modules/.bin/mocha --timeout 50000 -r @babel/register -r regenerator-runtime/runtime server/test/admin_live_lecture_schedule.test.js --exit"
                        echo "End Unit Test"

                        echo "Start BE deployment"

                        try {
                            sshCommand remote: remote, command: "sudo forever stop lp3backend${staging_number}"
                        } catch (err) {
                            echo err.getMessage()
                        }
                        sshCommand remote: remote, command: "sudo rm -rf /root/.forever/lp3backend${staging_number}.log"
                        sshCommand remote: remote, command: "sudo kill -9 `sudo lsof -t -i:${backend_port}`"
                        //sshCommand remote: remote, command: "if pids=\$(`sudo lsof -i:${backend_port} -t`); then sudo kill \$pids; fi;"

                        if(ghprbPullTitle.contains('#npmbe')){
                            sshCommand remote: remote, command: "cd ${cd_directory}/src/web-backend && sudo npm install"
                        }else{
                            echo "NOT Building NPM for backend"
                        }

                        sshCommand remote: remote, command: "cd ${cd_directory}/src/web-backend && sudo NODE_ENV=staging${staging_number} NODE_WORKSPACE=codingdojo forever --uid lp3backend${staging_number}  start -c node_modules/.bin/babel-node server/app.js"
                        */
                    }

                    echo currentBuild.result
                }
            }
        }
    } 
}
