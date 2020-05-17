const trapezoid = document.getElementById('trapezoid');

const controlTypes = [
    'slider',
    'input'
];

const units = {
    pixels: 'px',
    degrees: 'deg'
}

const unitMax = {
    'px': 200,
    'deg': 360
}

const controlSettings = {
    'height': units.pixels,
    'width': units.pixels,
    'perspective': units.pixels,
    'rotateX': units.degrees
};

const resultNames = [
    'height',
    'width'
];

const controlNames = Object.keys(controlSettings);

const controls = controlNames.reduce((acc, cur) => {
    const el = document.getElementById(cur);
    el.children[1].max = unitMax[controlSettings[cur]];
    el.children[1].value = 100;
    el.children[2].value = 100;
    acc[cur] = {};
    controlTypes.forEach((e, i) => {
        acc[cur][e] = el.children[i + 1];
    });
    return acc;
}, {});

const results = resultNames.reduce((acc, cur) => {
    const el = document.getElementById('r-' + cur);
    acc[cur] = el.children[1];
    return acc;
}, {});

const linkControls = (control, event, name) => {
    control[name].value = event.target.value;
}

const varChange = (id, e) => {
    const val = e.target.value + controlSettings[id];
    document.documentElement.style.setProperty('--' + id, val);
}

const otherT = (i) => controlTypes[(i + 1) % 2];

const setResult = (rect) => {
    resultNames.forEach(n => {
        results[n].value = rect[n];
    });
};
setResult(trapezoid.getBoundingClientRect());

controlNames.forEach(n => {
    const c = controls[n];
    controlTypes.forEach((t, i) => {
        c[t].addEventListener('input', e => {
            linkControls(c, e, otherT(i));
            varChange(n, e);
            const rect = trapezoid.getBoundingClientRect();
            setResult(rect);
        });
    });
});

const cssBox = document.getElementById('css');

printCss = () => {
    const res =
`#trapezoid {
    height: ${controls.height.slider.value}px;
    width: ${controls.width.slider.value}px;
    transform: perspective(${controls.perspective.slider.value}px) rotateX(${controls.rotateX.slider.value})
}
`;
    cssBox.innerText = res;
};

printCss();

document.getElementById('copy').addEventListener('click', e => {
    cssBox.select();
    document.execCommand('copy');
});