export const inputTmpl = `<input autocomplete="off" class="input" type="{{#if type}}{{type}}{{else}}text{{/if}}" name="{{name}}" value="{{value}}" id="{{name}}">`;
export const inputTmplFile = `<input class="input_file" type="file" name="{{name}}" accept="image/*">`;
export const textareaTmpl = `<textarea name="message" class="message_textarea" value="{{value}}">{{value}}</textarea>`;
export const wrapperInputTmpl = `<label class="label" for="{{name}}">{{label}}</label>
    {{{input}}}{{{errorComponent}}}`;
export const errorBlockTmpl =`<div class="error">{{error}}</div>`