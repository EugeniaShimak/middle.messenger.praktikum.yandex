function isEmpty(value: any) {
    if ((typeof value === 'object' || typeof value === 'string') && value!==null) {
        return typeof value === 'string' || Array.isArray(value) ? value.length === 0 : (Object.keys(value).length === 0 && value.size===undefined||value.size===0);
    }
    return true;
}

export default isEmpty;