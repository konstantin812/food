window.addEventListener('DOMContentLoaded', () => {
    let tabs = document.querySelectorAll('.tabcontent'),
        tabHeaderItem = document.querySelectorAll('.tabheader__item'),
        tabsHeader = document.querySelector('.tabheader');

// Tabs
    function hideTabs() {
        tabs.forEach((item, i) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });  
        tabHeaderItem.forEach((item) => {
            item.classList.remove("tabheader__item_active");
            });
    }

    function showTabs(i = 0) {
        tabs[i].classList.add("show", "fade");
        tabs[i].classList.remove("hide");
        tabHeaderItem[i].classList.add("tabheader__item_active");
    }

    tabsHeader.addEventListener('click', (e) => {
        let target = e.target;
        if(target && target.className == "tabheader__item") {
            tabHeaderItem.forEach((item, i) => {
                if(target == item) {
                    hideTabs();
                    showTabs(i);
                }
            });           
        } 
    });

    hideTabs();
    showTabs();


    // Timer
    let deadline = "2021-06-10";

    function timerCalc(endtime) {
        let t = Date.parse(endtime) - new Date();

        let days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60 ) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function addZero(num) {
        if( num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        let target = document.querySelector(selector),
            days = target.querySelector("#days"),
            hours = target.querySelector("#hours"),
            minutes = target.querySelector("#minutes"),
            seconds = target.querySelector("#seconds"),
            clockInt = setInterval(addClockData, 1000);
    
            addClockData();      
        function addClockData() {
            let t =  timerCalc(endtime);
                days.innerHTML = addZero(t.days);
                hours.innerHTML = addZero(t.hours);
                minutes.innerHTML = addZero(t.minutes);
                seconds.innerHTML = addZero(t.seconds);

            if(t.total == 0) {
                clearInterval(clockInt);
            }    
        }        
    } 
    setClock(".timer", deadline);

    // Modal

    let modal = document.querySelector('.modal'),
          showButtons = document.querySelectorAll('[data-modal]');
        //   hideButtons = document.querySelectorAll('[data-close]');
          
          showButtons.forEach((btns) => {
            btns.addEventListener('click', () => {
                show(modal);
            });
          });
        //   hideButtons.forEach((btns) => {
        //     btns.addEventListener('click', () => {
        //         hide(modal);
        //   });
        // });
        modal.addEventListener('click', (e) =>{
            if (e.target === modal || e.target.getAttribute('data-close') == '') {
                hide(modal);
            } 
        });

    function show(smth) {
        smth.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    function hide(smth) {
        smth.style.display = 'none';
        document.body.style.overflow = '';
    }
    

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display == 'block') {
            hide(modal);
        }
    });

    const afterTimeShow = setTimeout(function(){show(modal);}, 50000);

    function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                show(modal);
            window.removeEventListener('scroll', showModalByScroll);  
            }
    }

    window.addEventListener('scroll', showModalByScroll);




    // Classes

    class MenuItem {
        constructor(img, imgalt, subtitle, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.imgalt = imgalt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 10;
            this.changToUAH();
        }

        changToUAH() {
            this.price = this.price * this.transfer;
        }
        
        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                    <img src=${this.img} alt=${this.imgalt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                 `;
            this.parent.append(element);
        }
    }

const karavan = new MenuItem(
    "img/tabs/elite.jpg",
     "УПС",
    '"Афган-Кебаб"',
    "Это вам не Кюфта_бозбаш",
    10,
    ".menu .container",
    "menu__item"
    );
    karavan.render();

const yut = new MenuItem(
    "img/tabs/elite.jpg",
    "УПС",
    '"Люляшка"',
    "Это вам не шашлык",
    30,
    ".menu .container",
    "menu__item"
    );
    yut.render();

const stolovka = new MenuItem(
    "img/tabs/elite.jpg",
    "УПС",
    '"Комплексный"',
    "Это вам не понравится",
    20,
    ".menu .container",
    "menu__item"
    );
    stolovka.render();

    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: "Спасибо! Мы скоро с Вами свяжимся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        postData(item);
    });


    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
               display: block;
               margin: 0 auto;
            `;
            
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json');
           
           

            const formData = new FormData(form);
            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            }); 
            const json = JSON.stringify(object);


            fetch('server.php', {
                method : "POST",
                // headers : {
                //     'Content-type': 'application/json'
                // },
                body: formData
            }).then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();  
            }).catch(() =>{
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });


            // request.addEventListener('load', () => {
            //     if (request.status === 200 ) {
            //         console.log(request.response); 
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();                      
            //     } else {
                    
            //         showThanksModal(message.failure);
            //     }
            // });        
        });
    } 

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    show(modal);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    modal.append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        hide(modal);
    }, 4000);
}


});

