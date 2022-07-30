/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const list = document.getElementById('navbar__list');
const sections = document.querySelectorAll('Section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const CreateNavItem = index => {
    const listItem = document.createElement('li'); 
    const listLink = document.createElement('a');
    listLink.classList.add('menu__link');
    listLink.classList.add(`Section-${index+1}`);
    listLink.innerHTML = `Section ${index + 1}`;
    listItem.appendChild(listLink);
    list.appendChild(listItem);
}

const observerCallback = (entries,observer) => {

    const [entry] = [...entries];
    if (entry.isIntersecting) {
        const sectionName = entry.target.getAttribute('data-nav');
        const linkClass = sectionName.replace(' ','-');
        const currentLink = document.querySelector(`.${linkClass}`);
        activatedLink(currentLink);
    } 
    
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav
const navBuilder = () => {
    sections.forEach((section, index) => {
        CreateNavItem(index);
    });
}

// Add class 'active' to section when near top of viewport
const activatedSection = section => {
    section.classList.add('your-active-class');
    setTimeout(() => {
        section.classList.remove('your-active-class');
    }, 1000);
}
const activatedLink = link => {
    //remove all active classes
    const links = document.querySelectorAll('.menu__link');
    links.forEach(link => {
        link.classList.remove('your-active-class');
    })
    //add active class to the current link
    link.classList.add('your-active-class');
}

// Scroll to anchor ID using scrollTO event
const scrollToSection = section => {
    const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({top: sectionPosition, behavior: "smooth"});  
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

navBuilder();

list.addEventListener('click', e => {
    e.preventDefault();
    const sectionName = e.target.textContent;
    const section = document.querySelector(`[data-nav = '${sectionName}']`);
    activatedSection(section);
    scrollToSection(section);
});
 
const options = {root:null, threshold : 0.46}
const observer = new IntersectionObserver(observerCallback, options);

sections.forEach(section => {
    observer.observe(section);
});
