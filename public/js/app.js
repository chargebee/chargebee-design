AOS.init({
    delay: 200,
    duration: 1200,
    once: false,
    
});

function designApp() {
    return {
        atTop: true,
        menu: false,
        headerScroll() {
            this.atTop = (window.pageYOffset > 800) ? false : true;
        },
        menuToggle() {
            this.menu = !this.menu;

            console.log(this.menu)
        }   
    }


}