
export default class CustomNestedList {
    static get toolbox() {
        return {
            title: "Nested List",
            icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M7 4h14v2H7zM7 11h14v2H7zM7 18h14v2H7zM3 5h2v2H3zM3 12h2v2H3zM3 19h2v2H3z"/></svg>',
        };
    }

    constructor({ data }) {
        this.data = data || { items: [] };
    }

    render() {
        const container = document.createElement("div");
        container.classList.add("nested-list-block");

        const list = this.renderList(this.data.items);
        container.appendChild(list);

        const addBtn = document.createElement("button");
        addBtn.textContent = "+ Add Item";
        addBtn.classList.add("nested-list-add");
        addBtn.addEventListener("click", () => {
            const li = this.createListItem("");
            list.appendChild(li);
        });

        container.appendChild(addBtn);
        return container;
    }

    renderList(items = []) {
        const ul = document.createElement("ul");
        ul.classList.add("nested-list");

        items.forEach((item) => {
            const li = this.createListItem(item.text);
            if (item.children && item.children.length > 0) {
                li.appendChild(this.renderList(item.children));
            }
            ul.appendChild(li);
        });

        if (items.length === 0) {
            ul.appendChild(this.createListItem(""));
        }

        return ul;
    }

    createListItem(text = "") {
        const li = document.createElement("li");
        const input = document.createElement("div");
        input.contentEditable = true;
        input.classList.add("nested-list-item");
        input.innerHTML = text;

        input.addEventListener("keydown", (e) => this.handleKeydown(e, li));
        li.appendChild(input);

        return li;
    }

    handleKeydown(e, li) {
        const current = li;
        const parentList = li.parentElement;

        // TAB → indent (create sublist)
        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            const prevLi = li.previousElementSibling;
            if (prevLi) {
                let subList = prevLi.querySelector("ul");
                if (!subList) {
                    subList = document.createElement("ul");
                    subList.classList.add("nested-list");
                    prevLi.appendChild(subList);
                }
                subList.appendChild(li);
            }
        }

        // SHIFT + TAB → outdent (move up one level)
        if (e.key === "Tab" && e.shiftKey) {
            e.preventDefault();
            const parentLi = parentList.closest("li");
            if (parentLi && parentLi.parentElement) {
                parentLi.parentElement.insertBefore(li, parentLi.nextSibling);
            }
        }

        // ENTER → new sibling item
        if (e.key === "Enter") {
            e.preventDefault();
            const newLi = this.createListItem("");
            parentList.insertBefore(newLi, li.nextSibling);
            newLi.querySelector(".nested-list-item").focus();
        }
    }

    // Convert DOM → JSON (recursive)
    save(blockContent) {
        const parseList = (ul) => {
            return Array.from(ul.children)
                .filter((li) => li.querySelector(".nested-list-item"))
                .map((li) => ({
                    text: li.querySelector(".nested-list-item").innerHTML,
                    children: li.querySelector("ul") ? parseList(li.querySelector("ul")) : [],
                }));
        };

        const ul = blockContent.querySelector("ul");
        return { items: parseList(ul) };
    }

    static get sanitize() {
        return {
            items: { br: true },
        };
    }
}
