import Handlebars from "handlebars";

const wrapperCenter = `<div class="container_center">
        <div class="wrapper_middle">{{> @partial-block }}</div>
    </div>`;

export default Handlebars.registerPartial('wrapperCenter', wrapperCenter);

