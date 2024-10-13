pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'SonarQube' 
        DOCKER_IMAGE = 'bso-express-dev-sec-ops'
        APP_PORT = '3201'
        APP_NAME = 'ohmgay-app'
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
                // Build Docker image ใหม่โดยทับตัวเดิม
                sh "docker build -t ${DOCKER_IMAGE}:${params.DOCKER_TAG} ."
                echo "Docker image built: ${DOCKER_IMAGE}:${params.DOCKER_TAG}"
                // หยุดและลบคอนเทนเนอร์เก่าก่อน
                sh "docker-compose down"
                sh "docker-compose up -d"
                echo "docker-compose up ..."
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
