import { list, removeBlog, toggleBlogVisibility } from '../actions/blog';
import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  Stack,
  TextField,
  SettingToggle,
  TextStyle,
} from '@shopify/polaris';

class AnnotatedLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      discount: '10%',
      enabled: false,
      blogs: ['this is a blog']
    };
    this.loadBlogs = this.loadBlogs.bind(this);
    this.showAllBlogs = this.showAllBlogs.bind(this);
  }
 

  loadBlogs(){
      console.log('ran loadBlogs function');
      list().then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              console.log('blog array after updating: ',data);
              // setBlogs(data);
              // setLoaded(true);
              this.setState({
                blogs: data
              });
          }
      });
  };

  componentDidMount(){
    this.loadBlogs();
  }  

  showAllBlogs(){
    const { enabled } = this.state;
    const contentStatus = enabled ? 'Disable' : 'Enable';
    const textStatus = enabled ? 'enabled' : 'disabled';

    let {blogs} = this.state
    return blogs.map((blog, i) => {
        console.log('blog in showAllBlogs function',blog);
        return (  
          <SettingToggle
            action={{
              content: contentStatus,
              onAction: this.handleToggle,
            }}
            enabled={enabled}
          >
            This setting is{' '}
            <TextStyle variation="strong">{textStatus}</TextStyle>.
          </SettingToggle>
        )
      })
  }

  render() {
    const { discount,enabled } = this.state;
    const contentStatus = enabled ? 'Disable' : 'Enable';
    const textStatus = enabled ? 'enabled' : 'disabled';

    return (
      <Page>
        <Layout>
          <Layout.AnnotatedSection
            title="Default discount"
            description="Add a product to Sample App, it will automatically be discounted."
          >
            <Card sectioned>
              <Form onSubmit={this.handleSubmit}>
                <FormLayout>
                  <TextField
                    value={discount}
                    onChange={this.handleChange('discount')}
                    label="Discount percentage"
                    type="discount"
                  />
                  <Stack distribution="trailing">
                    <Button primary submit>
                      Save
                    </Button>
                  </Stack>
                </FormLayout>
              </Form>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Price updates"
            description="Temporarily disable all Sample App price updates"
          >
            {this.state.blogs ? this.showAllBlogs() : ''}
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );
  }

  handleSubmit = () => {
    this.setState({
      discount: this.state.discount,
    });
    console.log('submission', this.state);
  };

  handleChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };

  handleToggle = () => {
    this.setState(({ enabled }) => {
      return { enabled: !enabled };
    });
  };
}

export default AnnotatedLayout;