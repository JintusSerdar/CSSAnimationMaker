
        let log = document.getElementById('login');
        let reg = document.getElementById('register');
        let btn = document.getElementById('btn');

        function login(){
            log.style.right = "0";
            reg.style.right = "-120%";
            btn.style.left = "0";
            document.documentElement.style.setProperty('--transformOriginY', '-16.5px');
            document.documentElement.style.setProperty('--rotateDegree', '129deg');
        }
        function register(){
            log.style.right = "120%";
            reg.style.right = "0";
            btn.style.left = "50%";
            document.documentElement.style.setProperty('--transformOriginY', '300px');
            document.documentElement.style.setProperty('--rotateDegree', '222deg');
        }


        const emailInput = document.querySelector('input[type="email"]');
        const emailLabel = document.querySelector('label[for="registerEmail"]');

        emailInput.addEventListener('focus', () => {
            emailLabel.classList.add('focused');
        });

        emailInput.addEventListener('blur', () => {
            if (emailInput.value === '') {
                emailLabel.classList.remove('focused');
            }
        });

        emailInput.addEventListener('input', () => {
            if (emailInput.value !== '') {
                emailLabel.classList.add('focused');
            } else {
                emailLabel.classList.remove('focused');
            }
        });