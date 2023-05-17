function menuShow() {
    let nav = document.getElementsByTagName('nav-bar')[0];
    let phoneMenu = nav.shadowRoot.getElementById('phone-menu');
    phoneMenu.classList.remove('hidden');
}

function menuHide() {
    let nav = document.getElementsByTagName('nav-bar')[0];
    let phoneMenu = nav.shadowRoot.getElementById('phone-menu');
    phoneMenu.classList.add('hidden');
}

class NavBar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        this.template = document.createElement("template");
        this.template.innerHTML = this.markup;
        shadow.append(this.template.content.cloneNode(true));
        this.menu = document.getElementById('menu');
        console.log(this.menu);
    }


    style = /*css*/`
        * :not(i) {
            margin: 0;
            padding: 0;
            font-family: "Poppins", sans-serif;
            box-sizing: border-box;
        }
        
        nav {
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            padding: 10px 10%;
            background: linear-gradient(#080808, rgba(8, 8, 8, 0));
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        nav .logo {
            width: 140px;
        }
        nav .logo-link {
            text-decoration: none;
            color: inherit;
            color: #ffffff;
        }
        nav .text-logo {
            padding-right: 50px;
            font-size: 45px;
        }
        nav .text-logo span {
            color: #ff004f;
        }
        nav ul li {
            display: inline-block;
            list-style: none;
            margin: 10px 20px;
        }
        nav ul li a {
            color: #ffffff;
            text-decoration: none;
            font-size: 18px;
            position: relative;
        }
        nav ul li a:after {
            content: "";
            width: 0;
            height: 3px;
            background: #ff004f;
            position: absolute;
            left: 0;
            bottom: -6px;
            transition: 0.5s;
        }
        nav ul li a:hover::after {
            width: 100%;
        }

        .hidden {
            visibility: hidden;
        }

        #menu-open {
            display: none;
            visibility: hidden;
            color: #ffffff;
        }
        
        #phone-menu {
            height: 120vh;
            width: 100%;
            position: fixed;
            z-index: 1;
            top: 0;
            display: flex;
        }
        #phone-menu ul {
            width: 33%;
            background-color: #ff004f;
            display: flex;
            flex-direction: column;
        }
        .vert-space {
            position: relative;
            width: 67%;
        }

        @media only screen and (max-width: 735px) {
            #menu {
                display: none;
            }
            #menu-open {
                display: block;
                visibility: visible;
            }
            nav ul li a:after {
                background-color: #000000;
            }
        }
    `;

    markup = /*html*/`
        <style>
            ${this.style}
        </style>
        <nav>
            <a class="logo-link" href="/"><h1 class="text-logo"><span>J</span>an.</h1></a>
            <ul id="menu">
                <li><a href="/">Home</a></li>
                <li><a href="/dev">Dev</a></li>
                <li><a href="/dj">DJ</a></li>
                <li><a href="/tsrb">TŠRB</a></li>
                <li><a href="/about">About</a></li>
            </ul>
            <a id="menu-open" onclick="menuShow()">MENU</a>
            <div id="phone-menu" class="hidden">
                <div class="vert-space" onclick="menuHide()"></div>
                <ul>
                    <li><a onclick="menuHide()">X</a></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/dev">Dev</a></li>
                    <li><a href="/dj">DJ</a></li>
                    <li><a href="/tsrb">TŠRB</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </div>
        </nav>
    `;
}


customElements.define("nav-bar", NavBar);
