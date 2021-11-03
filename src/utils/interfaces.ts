type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
    currentTarget: T;
}

export type HTMLElementEventInputOrTextArea = HTMLElementEvent<HTMLInputElement|HTMLTextAreaElement>;

export type objectStrings = { [key: string]: string };