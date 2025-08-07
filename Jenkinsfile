pipeline {
    agent any
    environment {

    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
    }

    stage('Install Dependencies') {
        parallel {
            stage('Install Mody Dependencies') {
                steps {
                    dir('apps/mody') {
                        sh 'yarn install --frozen-lockfile'
                    }
                }
            }
        }
    }

    stage('Test') {
        parallel {
            stage('Test Mody') {
                dir('apps/mody') {
                    sh 'yarn test --passWithNoTests'
                }
            }
        }
    }

    stage('Build & Depoly Infrastructure') {
        steps {
            sh 'docker-compose build kong loki'
            sh 'docker-compose up -d kong loki'
        }
    }

    stage('Build & Deploy Mody') {
            steps {
                dir('apps/mody') {
                  sh 'npx eas build --platform all --non-interactive --profile production'
                }
            }
    }

     stage('Deploy Nginx & Monitoring') {
            steps {
                sh 'docker-compose up -d nginx'
            }
     }


    stage('Health Check') {
            steps {
                sh '''
                    echo "Checking services..."
                    sleep 30
                    curl -f http://localhost:8000/health || echo "Kong: ❌"
                    curl -f http://localhost:3100/ready || echo "Loki: ❌"
                    curl -f http://localhost:6379 || echo "Redis: ❌"
                    curl -f http://localhost:5432 || echo "PostgreSQL: ❌"
                    curl -f http://localhost:9090/-/healthy || echo "Prometheus: ❌"
                '''
            }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo '🎉 All services deployed successfully!'
        }
        failure {
            echo '❌ Deployment failed'
        }
    }
}