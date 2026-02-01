//-------------------------------------------------
//-------------------------------------------------
//This function is to get the json data from the user
//Then take the name and place it in the title 
fetch("./data/config.json")
.then(res=>res.json())
.then(
    config=>{
        document.title=`${config.name}|CP-Folio`;
        const footer = document.getElementById('footer-text');
        const title_name=document.getElementById("username_ind");
        if (title_name){
            title_name.textContent=`${config.name} | `+title_name.textContent;
        }
        if (footer) {
            footer.textContent = `© ${new Date().getFullYear()} ${config.name}`;
        }
    }
)
.catch(() => {
    const footer = document.getElementById('footer-text');
    if (footer) {
        footer.textContent = `© ${new Date().getFullYear()} CP-Folio`;
    }
});
//-------------------------------------------------
//-------------------------------------------------

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (siteNav.classList.contains('is-open')) {
                siteNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}
