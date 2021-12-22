AOS.init({
    delay: 200,
    duration: 1200,
    once: false,
    
});

$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:30,
        responsiveClass:true,
        autoplay: true,
        autoplayTimeout: 5000,
        dots: true,
        responsive:{
            0:{
                items:1,
                nav:false,
                dots: true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:3,
                nav:true,
                loop:false,
                dots: true
            }
        }
    })
  });

function designApp() {
    return {
        atTop: true,
        menu: false,
        topDiv: 0,
        designTab: false,
        commTab: false,
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
            this.designTab = true;
            console.log(firstDiv.offsetTop);
        },

        headerScroll() {
            //this.atTop = (window.pageYOffset > 800) ? false : true;
        },
        menuToggle() {
            this.menu = !this.menu;

            console.log(this.menu)
        }  ,

        productToggle() {
            this.designTab = true;
            this.commTab = false;
        },

        commToggle() {
            this.designTab = false;
            this.commTab = true;
        },

        menuClick(e) {
            e.preventDefault();
            const menuHref = e.srcElement.href;
            const splitedHash = menuHref.lastIndexOf('#');  
            const result = menuHref.substring(splitedHash + 1);
            const divId = document.getElementById(result);
           // console.log(divId.offsetTop)
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