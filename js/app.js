AOS.init({
    delay: 200,
    duration: 1200,
    once: false,
    
});

function designApp() {
    return {
        atTop: true,
        menu: false,
        topDiv: 0,
        menuLists: [
            {name: "In a Nutshell", href: "#nutshell"},
            {name: "Design Org", href: "#design"},
            {name: "vision & Mission", href: "#vision-mission"},
            {name: "CURRENTLY HIRING", href: "#hiring"},
            {name: "FAQS", href: "#faqs"},
            {name: "Why work with us?", href: "#work-with-us"},

        ],

        init() {
            const firstDiv = document.getElementById('nutshell');

            console.log(firstDiv.offsetTop);
        },

        headerScroll() {
            this.atTop = (window.pageYOffset > 800) ? false : true;
        },
        menuToggle() {
            this.menu = !this.menu;

            console.log(this.menu)
        }  ,

        menuClick(e) {
            e.preventDefault();
            const menuHref = e.srcElement.href;
            const splitedHash = menuHref.lastIndexOf('#');  
            const result = menuHref.substring(splitedHash + 1);
            const divId = document.getElementById(result);
            console.log(divId.offsetTop)
            const divPosition = divId.offsetTop;

            // if(win)

            window.scrollTo({
                top: divPosition,
                behavior: 'smooth'
              });
            
            //console.log(divPosition, window.offsetTop)
            
            
        }
    }


}