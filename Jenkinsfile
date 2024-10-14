pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'SonarQube' 
        DOCKER_IMAGE = 'your-docker-image'
        APP_PORT = '3201'
        APP_NAME = 'your-app-name'
        GIT_URL = 'https://github.com/ohmjess/DevSecOps'
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch name for the build')
        string(name: 'DOCKER_TAG', defaultValue: 'latest', description: 'Docker image tag')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    cleanWs()
                    git branch: "${params.BRANCH_NAME}", url: "${GIT_URL}"
                }
            }
        }

        stage('Verify Branch') {
            steps {
                script {
                    if ("${params.BRANCH_NAME}" != "main") {
                        error("This pipeline only runs on the main branch. Current branch: ${params.BRANCH_NAME}")
                    }
                }
            }
        }

        stage('Pulling Project')
        {
            steps {
                echo 'Pulling the project...'
                sh "git pull origin ${params.BRANCH_NAME}"
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running unit tests...'
                sh 'npm test'
            }
        }

        stage('Scan') {
            steps {
                withCredentials([string(credentialsId: 'jenkin-sonaqube', variable: 'SONAR_TOKEN')]) {
                    sh '''
                        npm install sonar-scanner
                        npx sonar-scanner \
                        -Dsonar.projectKey=mywebapp \
                        -Dsonar.host.url=http://sonarqube:9000 \
                        -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }

        // stage('Clear Image')
        // {
        //     steps {
        //         echo 'Clearing Docker image...'
        //         sh "docker rmi -f ${DOCKER_IMAGE}:${params.DOCKER_TAG}"
        //     }
        // }

        // stage('Build Docker Image') {
        //     steps {
        //         echo 'Building Docker image...'
        //         sh "docker build -t ${DOCKER_IMAGE}:${params.DOCKER_TAG} ."
        //         echo "Docker image built: ${DOCKER_IMAGE}:${params.DOCKER_TAG}"
        //     }
        // }

        // stage('Clear Container') {
        //     steps {
        //         script {
        //             def containers = sh(script: "docker ps -q --filter publish=${APP_PORT}", returnStdout: true).trim()
        //             if (containers) {
        //                 echo "Stopping and removing containers using port ${APP_PORT}..."
        //                 sh "echo ${containers} | xargs docker stop"
        //                 sh "echo ${containers} | xargs docker rm"
        //             } else {
        //                 echo "No containers are using port ${APP_PORT}."
        //             }
        //         }
        //     }
        // }



        

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // ตัวอย่างการนำไปใช้โดยใช้ Docker
                // sh "docker run -d -p ${APP_PORT}:3000 ${DOCKER_IMAGE}:${params.DOCKER_TAG}"
                sh "docker-compose up -d --build"
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
        cleanup {
            echo 'Cleaning up...'
        }
    }
}
