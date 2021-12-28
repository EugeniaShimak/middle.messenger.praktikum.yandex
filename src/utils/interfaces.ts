type THTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
    currentTarget: T;
}

export type THTMLElementEventInputOrTextArea = THTMLElementEvent<HTMLInputElement|HTMLTextAreaElement>;

export type TObjectStrings = { [key: string]: string };

export type TIndexed<T = any> = {
    [key in string]: T;
};