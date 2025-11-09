export default class TextColorPlugin {
    static get isInline() {
        return true; // inline tool
    }

    static get toolbox() {
        return {
            title: 'Color',
            icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18C8.13 2 5 5.13 5 9c0 2.61 1.67 4.83 4 5.65V18h6v-3.35c2.33-.82 4-3.04 4-5.65 0-3.87-3.13-7-7-7z"/></svg>'
        };
    }

    constructor({ api, data, config }) {
        this.api = api;
        this.data = data || {};
        this.config = config || {};

        this.type = this.config.type || 'text'; // 'text' or 'marker'
        this.defaultColor = this.config.defaultColor || (this.type === 'marker' ? '#FFFF00' : '#000000');
        this.colorCollections = this.config.colorCollections || ['#000000', '#FF0000', '#00FF00', '#0000FF'];
        this.color = this.data.color || this.defaultColor;
        this.wrapper = undefined;
    }

    render() {
        this.wrapper = document.createElement('span');
        this.wrapper.contentEditable = true;
        this.applyColor(this.color);
        this.wrapper.innerHTML = this.data.text || '';
        return this.wrapper;
    }

    /**
     * Applies color to the span
     */
    applyColor(color) {
        if (!this.wrapper) return;
        if (this.type === 'marker') {
            this.wrapper.style.backgroundColor = color;
        } else {
            this.wrapper.style.color = color;
        }
    }

    /**
     * Toolbar settings (palette + custom color)
     */
    renderSettings() {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexWrap = 'wrap';
        container.style.gap = '6px';
        container.style.alignItems = 'center';

        // Create color palette
        this.colorCollections.forEach((clr) => {
            const btn = document.createElement('button');
            btn.style.width = '20px';
            btn.style.height = '20px';
            btn.style.borderRadius = '4px';
            btn.style.border = '1px solid #ccc';
            btn.style.backgroundColor = clr;
            btn.style.cursor = 'pointer';

            btn.addEventListener('click', () => {
                this.color = clr;
                this.applyColor(this.color);
            });

            container.appendChild(btn);
        });

        // Add custom color picker
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = this.color;
        colorInput.style.width = '28px';
        colorInput.style.height = '28px';
        colorInput.style.padding = '0';
        colorInput.style.border = 'none';
        colorInput.style.cursor = 'pointer';

        colorInput.addEventListener('input', (e) => {
            this.color = e.target.value;
            this.applyColor(this.color);
        });

        container.appendChild(colorInput);

        return container;
    }

    save(blockContent) {
        return {
            text: blockContent.innerHTML,
            color: this.color,
        };
    }
}
