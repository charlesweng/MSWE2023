function start() {
  // let globalBookmarks = [];

  class BookmarkInputForm extends React.Component {
    constructor(props) {
      super(props);
      console.log("BookmarkInputForm component created.");
      this.state = {
        webPageTitle: '',
        webPageDescription: '',
        webPageLink: ''
      };
      this.handleWebPageTitleChange = this.handleWebPageTitleChange.bind(this);
      this.handleWebPageDescriptionChange = this.handleWebPageDescriptionChange.bind(this);
      this.handleWebPageLinkChange = this.handleWebPageLinkChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleWebPageTitleChange(event) {
      this.setState({
        webPageTitle: event.target.value
      });
    }
    handleWebPageDescriptionChange(event) {
      this.setState({
        webPageDescription: event.target.value
      });
    }
    handleWebPageLinkChange(event) {
      this.setState({
        webPageLink: event.target.value
      });
    }
    handleSubmit(event) {
      // globalBookmarks.push(
      //   {
      //     webPageTitle: this.state.webPageTitle,
      //     webPageDescription: this.state.webPageDescription,
      //     webPageLink: this.state.webPageLink
      //   }
      // )
      this.props.addBookmark(this.state.webPageTitle, this.state.webPageLink, this.state.webPageDescription);
      // console.log(globalBookmarks);
      event.preventDefault();
    }
    render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        required: true,
        value: this.state.webPageTitle,
        onChange: this.handleWebPageTitleChange,
        type: "text",
        placeholder: "Web Page Title"
      }), /*#__PURE__*/React.createElement("input", {
        required: true,
        value: this.state.webPageDescription,
        onChange: this.handleWebPageDescriptionChange,
        type: "text",
        placeholder: "Web Page Description"
      }), /*#__PURE__*/React.createElement("input", {
        required: true,
        value: this.state.webPageLink,
        onChange: this.handleWebPageLinkChange,
        type: "text",
        placeholder: "Link"
      }), /*#__PURE__*/React.createElement("button", {
        type: "submit"
      }, "Add Bookmark")));
    }
  }
  class Bookmark extends React.Component {
    constructor(props) {
      super(props);
      console.log("Bookmark component created");
    }
    title = this.props.title;
    titleStyle = {
      color: "red"
    };
    render() {
      return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h2", {
        style: this.titleStyle
      }, this.title), /*#__PURE__*/React.createElement("a", {
        href: this.props.href
      }, this.props.description), /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          this.title = this.title + "-CHANGED";
          this.setState({});
        }
      }));
    }
  }
  class BookmarkList extends React.Component {
    constructor(props) {
      super(props);
      console.log("BookmarkList component created.");
    }
    shouldComponentUpdate(nextProps, nextState) {
      console.log(this.props);
      console.log(nextProps);
      return this.props.globalBookmarks.length < nextProps.globalBookmarks.length;
    }
    render() {
      return this.props.globalBookmarks.map((bookmark, index) => [/*#__PURE__*/React.createElement(Bookmark, {
        key: index,
        title: bookmark.webPageTitle,
        href: bookmark.webPageLink,
        description: bookmark.webPageDescription
      })]);
    }
  }
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        globalBookmarks: []
      };
      this.addBookmark = this.addBookmark.bind(this);
    }
    addBookmark(title, link, description) {
      this.setState({
        globalBookmarks: [...this.state.globalBookmarks, {
          webPageTitle: title,
          webPageDescription: description,
          webPageLink: link
        }]
      });
      console.log(this.state.globalBookmarks);
    }
    render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Bookmarks"), /*#__PURE__*/React.createElement(BookmarkInputForm, {
        addBookmark: this.addBookmark
      }), /*#__PURE__*/React.createElement("ol", null, /*#__PURE__*/React.createElement(Bookmark, {
        title: "Etherient",
        href: "https://www.etherient.com",
        description: "The home page of Etherient"
      }), /*#__PURE__*/React.createElement(Bookmark, {
        title: "Frank's Site",
        href: "https://www.zammetti.com",
        description: "The web home of Frank W. Zammetti"
      }), /*#__PURE__*/React.createElement(BookmarkList, {
        globalBookmarks: this.state.globalBookmarks
      })));
    }
  }
  ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("mainContainer"));
}
