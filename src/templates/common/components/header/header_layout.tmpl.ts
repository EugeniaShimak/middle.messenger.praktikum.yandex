export const headerTmpl = `
        <div class="header_actions">
         {{#if withActions}}
            <ul>
                <li class="header_item">
                    {{{buttonCreateChat}}}
                </li>
                <li class="header_item">
                    <input class="input input_search" type="text" name="search" id="search" placeholder="Поиск">
                </li>
            </ul>
            {{/if}}
    </div>
    <nav class="header_list">
        <ul>
            {{{linkProfile}}}
            {{{linkChats}}}
            {{{logoutButton}}}         
        </ul>
    </nav>
{{{createChatDialog}}}`;
