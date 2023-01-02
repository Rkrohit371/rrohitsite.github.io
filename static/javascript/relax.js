const container = document.getElementById('container');
const test = document.getElementById('test');

const totalTime = 7500;
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation()

function breathAnimation() {
    test.innerText = 'Breath In!';
    container.className = 'container grow'

    setTimeout(() => {
        test.innerText = 'Hold';

        setTimeout(() => {
            test.innerText = 'Breath Out!';
            container.className = 'container shrink'
        }, holdTime);
    }, breathTime);
}

setInterval(breathAnimation, totalTime)