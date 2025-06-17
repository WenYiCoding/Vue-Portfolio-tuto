import gsap from 'gsap';

const splitText = (element) => {
    const childNodes = Array.from(element.childNodes);
    element.innerHTML = '';

    const createWordSpan = (word) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.whiteSpace = 'nowrap';
        wordSpan.innerHTML = word.split('').map((char) => char === '' 
            ? '<span style="display: inline-block; text-transform: none;">&nbsp;</span>' 
            : `<span style="display: inline-block; text-transform: none;">${char}</span>`).join('');
        return wordSpan;
    }

    const processText = (text, parent) => {
        const words = text.split(/(\s+)/);
        words.forEach(word => {
            if (word.trim() === '') {
                parent.innerHTML += word;
            } else {
                const wordSpan = createWordSpan(word);
                parent.appendChild(wordSpan);
            }
        });
    }

    childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            processText(node.textContent, element);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const clonedNode = node.cloneNode(false);
            processText(node.textContent, clonedNode);
            element.appendChild(clonedNode);
        }
    });

    return element.querySelectorAll('span span');
}

export const animateWavyText = (element, delay = 0) => {
    const letters = splitText(element);

    gsap.fromTo(letters, {
        y: 50,
        opacity: 0,
        rotate: 10,
    }, {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1,
        ease: 'back.out(2)',
        stagger: 0.05,
        delay: delay,
    });
}