import { generateAboutMeHTML } from './components/aboutme.js';
import { generateSkillsHTML } from './components/skills.js';
import { generateExperienceHTML } from './components/experiences.js';
import { generateServicesHTML } from './components/services.js';
// import { generateSkillsHTML } from './components/skills.js';

document.addEventListener('DOMContentLoaded', function () {
    "use strict";
    
    generateAboutMeHTML();
    generateSkillsHTML();
    generateExperienceHTML();
    generateServicesHTML();

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            var spinnerElement = document.getElementById('spinner');
            if (spinnerElement) {
                spinnerElement.classList.remove('show');
            }
        }, 1000);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init(); // WOW.js自体はjQuery依存ではないため、そのまま使用可能です。

    // Facts counter
    var counters = document.querySelectorAll('[data-toggle="counter-up"]');
    counters.forEach(function(counter) {
        var countUp = new CountUp(counter, 0, parseInt(counter.innerText), 0, 2);
        countUp.start();
    });

    // Typed Initiate
    var typedTextOutput = document.querySelector('.typed-text-output');
    if (typedTextOutput) {
        var typedStrings = document.querySelector('.typed-text').innerText;
        new Typed('.typed-text-output', {
            strings: typedStrings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Smooth scrolling to section
    var scrollButtons = document.querySelectorAll(".btn-scroll");
    scrollButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                var targetElement = document.querySelector(this.hash);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Skills
    var skills = document.querySelectorAll('.skill');
    skills.forEach(function (skill) {
        var waypoint = new Waypoint({
            element: skill,
            handler: function () {
                var progressBars = skill.querySelectorAll('.progress .progress-bar');
                progressBars.forEach(function (progressBar) {
                    progressBar.style.width = progressBar.getAttribute('aria-valuenow') + '%';
                });
            },
            offset: '80%'
        });
    });

    // Portfolio isotope and filter
    var portfolioContainer = document.querySelector('.portfolio-container');
    var portfolioFilters = document.querySelectorAll('#portfolio-flters li');
    if (portfolioContainer && portfolioFilters) {
        var iso = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        portfolioFilters.forEach(function (filter) {
            filter.addEventListener('click', function () {
                document.querySelector('#portfolio-flters li.active').classList.remove('active');
                filter.classList.add('active');
                iso.arrange({ filter: filter.getAttribute('data-filter') });
            });
        });
    }

    // Testimonials carousel
    var testimonialCarousel = document.querySelector(".testimonial-carousel");
    if (testimonialCarousel) {
        var owlCarousel = new OwlCarousel(testimonialCarousel, {
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            loop: true,
            items: 1
        });
    }

    // Back to top button
    var backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
