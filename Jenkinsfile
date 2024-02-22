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
                    // tests

                    echo "port is ${port}"
                    echo "directory is ${directory}"
                    echo "staging_env is ${staging_env}"

                    echo currentBuild.result
                }
            }
        }
    } 
}
