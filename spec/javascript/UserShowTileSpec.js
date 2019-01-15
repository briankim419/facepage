import UserShowTile from '../../app/javascript/react/components/UserShowTile'

describe("UserShowTile", () => {
  let wrapper;
  

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <UserShowTile
        followers= "Test"
        followeds= "Test"
        firstName="Brian"
        lastName="Kim"
        email="test@gmail.com"
        followersLength="10"
        followedsLength="20"
        currentUserId="Test"
        following="Test"
      />
    )
  });

  it("should render an h1 tag", () => {
    expect(wrapper.find("h1")).toBePresent();
  });

  it("should render a p tag", () => {
    expect(wrapper.find("p")).toBePresent();
  });

  it("should render a span tag", () => {
    expect(wrapper.find("span")).toBePresent();
  });

  it("should render a span tag with the the text property value", () => {
  expect(wrapper.find("span").text()).toBe(" Followers:  10 | Following:  20 ")
  });

  it("should render a h1 tag with the the text property value", () => {
  expect(wrapper.find("h1").text()).toBe("Brian Kim")
  });

  it("should render a p tag with the the text property value", () => {
  expect(wrapper.find("p").text()).toBe("email: test@gmail.com")
  });


})
