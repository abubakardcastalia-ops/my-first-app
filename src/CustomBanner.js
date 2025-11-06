export default class CustomBanner {
    static get toolbox() {
        return {
            title: 'Banner',
            icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 4h18v4H3zM3 10h18v4H3zM3 16h18v4H3z"/></svg>'
        };
    }

    constructor({ data }) {
        this.data = data || { text: '', style: 'info' };
        this.wrapper = undefined;
    }

    render() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('banner-block', `banner-${this.data.style}`);

        const select = document.createElement('select');
        ['info', 'warning', 'success', 'danger'].forEach(style => {
            const option = document.createElement('option');
            option.value = style;
            option.textContent = style.charAt(0).toUpperCase() + style.slice(1);
            if (this.data.style === style) option.selected = true;
            select.appendChild(option);
        });

        const input = document.createElement('div');
        input.contentEditable = true;
        input.innerHTML = this.data.text || 'Write your banner text...';
        input.classList.add('banner-text');

        select.addEventListener('change', (e) => {
            this.data.style = e.target.value;
            this.wrapper.className = `banner-block banner-${e.target.value}`;
        });

        input.addEventListener('input', (e) => {
            this.data.text = e.target.innerHTML;
        });

        this.wrapper.appendChild(select);
        this.wrapper.appendChild(input);
        return this.wrapper;
    }

    save(blockContent) {
        const text = blockContent.querySelector('.banner-text').innerHTML;
        const style = blockContent.querySelector('select').value;
        return { text, style };
    }

    static get sanitize() {
        return {
            text: { br: true },
            style: {},
        };
    }
}
