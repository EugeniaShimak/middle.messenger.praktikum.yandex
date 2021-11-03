export const inputTmpl = `<input autocomplete="off" class="input" type="{{#if type}}{{type}}{{else}}text{{/if}}" name="{{name}}" id="{{name}}">`;
export const textareaTmpl = `<textarea name="message" class="message_textarea">`;
export const wrapperInputTmpl = `<label class="label" for="{{name}}">{{label}}</label>
    {{{input}}}<div class="{{name}} error">{{error}}</div>`;