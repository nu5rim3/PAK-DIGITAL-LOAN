pipeline {  
    environment {
        def con_name="mobix-cams-digital-loan-web"
        def tag="prod"
    }
    agent none
      stages {
          stage('mvn build') {
          agent { docker { image 'fra.ocir.io/lolctech/fxapiuser/node:latest' } }
          steps{
              sh 'ls -la'
          }
    }
        stage('Build docker image'){
            agent {
              label "local"
            }
        steps {
            sh "docker build -t  fra.ocir.io/lolctech/pakoman/release/${con_name}:${tag} ."
               }
            } 
        stage('Push to OCIR') {
            agent {
              label "local"
            }
            steps {
                script {
                    docker.withRegistry( 'https://fra.ocir.io', 'OCIR-JEN' ) {
                    sh "docker push fra.ocir.io/lolctech/pakoman/release/${con_name}:${tag}"
                    }
                }
            }
        }
    }
}