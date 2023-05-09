class NavBar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        this.template = document.createElement("template");
        this.template.innerHTML = this.markup;
        shadow.append(this.template.content.cloneNode(true));
    }

    style = /*css*/`
        * {
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
        nav .fa-bars, nav .fa-x {
            display: none;
        }
    `;

    markup = /*html*/`
        <style>
            ${this.style}
        </style>
        <nav>
            <a class="logo-link" href="/index.html"><h1 class="text-logo"><span>J</span>an.</h1></a>
            <ul id="menu">
                <li><a href="/index.html">Home</a></li>
                <li><a href="/dev.html">Dev</a></li>
                <li><a href="/dj.html">DJ</a></li>
                <li><a href="/tsrb.html">TŠRB</a></li>
                <li><a href="/about.html">About</a></li>
                <i class="fa-solid fa-x" onclick="menuClose()"></i>
            </ul>
            <i class="fa-solid fa-bars" onclick="menuOpen()"></i>
        </nav>
    `;
}

customElements.define("nav-bar", NavBar);
