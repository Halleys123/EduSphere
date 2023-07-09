const defaultProperties = [
  {
    name: "background-color",
    value: "#0c0d21",
  },
  {
    name: "width",
    value: "18rem",
  },
  {
    name: "height",
    value: "3.2rem",
  },
  {
    name: "display",
    value: "flex",
  },
  {
    name: "flex-direction",
    value: "column",
  },
  {
    name: "align-items",
    value: "center",
  },
  {
    name: "border",
    value: "1px solid black",
  },
  {
    name: "border-radius",
    value: "0.6rem",
  },
  {
    name: "font-family",
    value: '"Poppins", sans-serif',
  },
  {
    name: "font-size",
    value: "1.8rem",
  },
  {
    name: "color",
    value: "white",
  },
  {
    name: "overflow",
    value: "hidden",
  },
  {
    name: "transition",
    value: "all 0.3s",
  },
  {
    name: "max-height",
    value: 3,
  },
];

const defaultItemProperties = [
  {
    name: "display",
    value: "flex",
  },
  {
    name: "justify-content",
    value: "center",
  },
  {
    name: "align-items",
    value: "center",
  },
  {
    name: "flex",
    value: "1 0",
  },
  {
    name: "width",
    value: "100%",
  },
  {
    name: "min-height",
    value: "3.2rem",
  },
  {
    name: "transition",
    value: "all 0.6s",
  },
  {
    name: "cursor",
    value: "pointer",
  },
  {
    name: "background-color",
    value: "#0c0d21",
  },
  {
    name: "hoverColor",
    value: "#1e1f4b",
  },
];

class dropdown {
  constructor(dropdown, dropdownItems, properties, itemProperties) {
    this.dropdown = dropdown;
    this.dropdownItems = dropdownItems;
    this.properties = properties;
    this.itemProperties = itemProperties;
  }
  static defaultProperties() {
    return defaultProperties;
  }
  static defaultItemProperties() {
    return defaultItemProperties;
  }

  createDropdown() {
    this.dropdown.style.width = this.properties[1].value;
    this.dropdown.style.height = this.properties[2].value;
    this.dropdown.style.backgroundColor = this.properties[0].value;
    this.dropdown.style.border = this.properties[6].value;
    this.dropdown.style.borderRadius = this.properties[7].value;
    this.dropdown.style.fontFamily = this.properties[8].value;
    this.dropdown.style.fontSize = this.properties[9].value;
    this.dropdown.style.color = this.properties[10].value;
    this.dropdown.style.overflow = this.properties[11].value;
    this.dropdown.style.transition = this.properties[12].value;
    this.dropdown.style.display = this.properties[3].value;
    this.dropdown.style.flexDirection = this.properties[4].value;
    this.dropdown.style.alignItems = this.properties[5].value;
  }

  createDropdownItems() {
    this.dropdownItems.forEach((item) => {
      item.style.display = this.itemProperties[0].value;
      item.style.justifyContent = this.itemProperties[1].value;
      item.style.alignItems = this.itemProperties[2].value;
      item.style.flex = this.itemProperties[3].value;
      item.style.width = this.itemProperties[4].value;
      item.style.minHeight = this.itemProperties[5].value;
      item.style.transition = this.itemProperties[6].value;
      item.style.cursor = this.itemProperties[7].value;
      item.style.backgroundColor = this.itemProperties[8].value;

      item.addEventListener("mouseover", (e) => {
        e.currentTarget.style.backgroundColor = this.itemProperties[9].value;
      });
      item.addEventListener("mouseout", (e) => {
        e.currentTarget.style.backgroundColor = this.itemProperties[8].value;
      });
    });
  }

  toggleDropdown() {
    this.dropdown.addEventListener("click", (e) => {
      const child = e.currentTarget.children;
      const elementheight = child[0].getBoundingClientRect().height;

      if (!child[0].classList.contains("hidden")) {
        const height = elementheight * child.length;
        child[0].style.opacity = "0";
        if (height <= elementheight * this.properties[13].value) {
          e.currentTarget.style.height = `${height}px`;
        } else {
          e.currentTarget.style.height = `${
            elementheight * this.properties[13].value
          }px`;
          e.currentTarget.style.overflowY = "scroll";
        }
        // e.currentTarget.style.height = `${height}px`;
      } else {
        child[0].style.opacity = "1";
        const height = elementheight;
        e.currentTarget.style.height = `${height}px`;
      }
      child[0].classList.toggle("hidden");
    });
  }
  selectItem() {
    this.dropdownItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const child = e.currentTarget.children;
        if (child == this.dropdownItems[0]) {
          this.dropdownItems[0].textContent = "Select an Item Please";
          return;
        }
        const text = e.currentTarget.textContent;
        this.dropdownItems[0].textContent = text;
        this.dropdownItems[0].style.color = this.properties[10].value;
      });
    });
  }
  init() {
    this.properties = [...dropdown.defaultProperties()];
    this.itemProperties = [...dropdown.defaultItemProperties()];
    this.createDropdown();
    this.createDropdownItems();
    this.toggleDropdown();
    this.selectItem();
  }
}

export default dropdown;
