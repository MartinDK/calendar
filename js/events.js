function addEvents(e) {
    for (let i = 0; i < e.length; i++) {
        e[i].addEventListener("click", function () {
        this.classList.add("selected");
    });
};
}