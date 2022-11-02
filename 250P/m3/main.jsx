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
      }

      this.handleWebPageTitleChange = this.handleWebPageTitleChange.bind(this);
      this.handleWebPageDescriptionChange = this.handleWebPageDescriptionChange.bind(this);
      this.handleWebPageLinkChange = this.handleWebPageLinkChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleWebPageTitleChange(event) {
      this.setState({ webPageTitle: event.target.value });
    }

    handleWebPageDescriptionChange(event) {
      this.setState({ webPageDescription: event.target.value });
    }

    handleWebPageLinkChange(event) {
      this.setState({ webPageLink: event.target.value });
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
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input required value={this.state.webPageTitle} onChange={this.handleWebPageTitleChange} type='text' placeholder='Web Page Title' />
            <input required value={this.state.webPageDescription} onChange={this.handleWebPageDescriptionChange} type='text' placeholder='Web Page Description' />
            <input required value={this.state.webPageLink} onChange={this.handleWebPageLinkChange} type='text' placeholder='Link' />
            <button type="submit">Add Bookmark</button>
          </form>
        </div>
      );
    };
  }



  class Bookmark extends React.Component {
    constructor(props) {
      super(props);
      console.log("Bookmark component created");
    }
    title = this.props.title;
    titleStyle = { color: "red" }
    render() {
      return (<li>
        <h2 style={this.titleStyle}>{this.title}</h2>
        <a href={this.props.href}>
          {this.props.description}
        </a>
        <button onClick={() => {
          this.title = this.title + "-CHANGED";
          this.setState({});
        }}>
        </button>
      </li>
      );
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
      return (
        this.props.globalBookmarks.map((bookmark, index) => [
          <Bookmark
            key={index}
            title={bookmark.webPageTitle}
            href={bookmark.webPageLink}
            description={bookmark.webPageDescription}
          />
        ])
      );
    }
  }

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        globalBookmarks: []
      }
      this.addBookmark = this.addBookmark.bind(this);
    }

    addBookmark(title, link, description) {
      this.setState({
        globalBookmarks: [...this.state.globalBookmarks, {
          webPageTitle: title,
          webPageDescription: description,
          webPageLink: link
        }]
      })
      console.log(this.state.globalBookmarks);
    }

    render() {
      return (
        <div>
          <h1>Bookmarks</h1>
          <BookmarkInputForm
            addBookmark={this.addBookmark}
          />
          <ol>
            <Bookmark title={"Etherient"}
              href={"https://www.etherient.com"}
              description={"The home page of Etherient"}
            />
            <Bookmark title={"Frank's Site"}
              href={"https://www.zammetti.com"}
              description={"The web home of Frank W. Zammetti"}
            />
            <BookmarkList
              globalBookmarks={this.state.globalBookmarks}
            />
          </ol>
        </div>
      );
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById("mainContainer")
  );
}