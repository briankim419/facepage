import PostContainer from '../../app/javascript/react/containers/PostContainer';
import CommentFormContainer from '../../app/javascript/react/containers/CommentFormContainer';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import fetchMock from 'fetch-mock';

describe("UserShowContainer", () => {
  let wrapper;
  let data
  beforeEach(() => {

    jasmineEnzyme();
    data = {
      comments: [
        {
        id: 1,
        text: "Comment Test",
        post_id: 2,
        created_at: "2019-01-15T15:51:22.803Z",
        updated_at: "2019-01-15T15:51:22.803Z"
        }
      ]
    }
    fetchMock.get('/api/v1/posts/1/comments', {
      status: 200,
      body: data
    });
    wrapper = mount( <PostContainer /> );
  })

  afterEach(fetchMock.restore)
  it('should render the journey selection form', (done) => {
    setTimeout(() => {
      expect(wrapper.find(CommentFormContainer)).toBePresent()
      done()
    }, 0)
  })

  it('renders an h4 for each item returned from the api call', (done) => {
    setTimeout(() => {
      expect(wrapper.find('h3')).toBePresent()
      done()
    }, 0)
  })
})
