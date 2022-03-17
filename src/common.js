function createElementWrapper(tag, classes = null, id = null) {
    const element = document.createElement(tag);
    if (id !== null) {
        element.id = id;
    }
    if (classes !== null) {
        classes.forEach((cssClass) => {
            element.classList.add(cssClass);
        })
    }
    return element;
}
