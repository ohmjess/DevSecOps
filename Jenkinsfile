pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'SonarQube' 
        DOCKER_IMAGE = 'your-docker-image'
        APP_PORT = '3201'
        APP_NAME = 'your-app-name'
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
                    git branch: "${params.BRANCH_NAME}", url: 'https://github.com/boytur/DevSecOps'
                    // git pull origin "${params.BRANCH_NAME}"
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

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${DOCKER_IMAGE}:${params.DOCKER_TAG} ."
                echo "Docker image built: ${DOCKER_IMAGE}:${params.DOCKER_TAG}"
            }
        }

        stage('Clear Container') {
            steps
            {
                sh "docker ps -q --filter publish=${APP_PORT} | xargs docker stop"
                sh "docker ps -q --filter publish=${APP_PORT} | xargs docker rm"
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // ตัวอย่างการนำไปใช้โดยใช้ Docker
                sh "docker run -d -p ${APP_PORT}:3000 ${DOCKER_IMAGE}:${params.DOCKER_TAG}"
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
