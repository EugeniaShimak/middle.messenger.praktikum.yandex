import Handlebars from "../../../static/lib/handlebars-v4.7.7";

const header = `<header class="header_wrapper">
        <div class="header_actions">
         {{#if withActions}}
            <ul>
                <li class="header_item">
                    <button class="button">Создать чат</button>
                </li>
                <li class="header_item">
                    <input class="input input_search" type="text" name="search" id="search" placeholder="Поиск">
                </li>
            </ul>
            {{/if}}
    </div>
    <nav class="header_list">
        <ul>
            <li class="header_item"><a class="header_nav_item link" href='#'>Профиль</a></li>
            <li class="header_item"><a class="header_nav_item link link_active" href='#'>Чаты</a></li>
            <li class="header_item"><a class="header_nav_item link link_grey" href='#'>Выйти</a></li>
        </ul>
    </nav>
    </header>`;

export const headerTmpl = Handlebars.compile(header);

