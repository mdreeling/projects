require 'spec_helper'

describe "media/index" do
  before(:each) do
    assign(:media, [
      stub_model(Medium,
        :name => "Name"
      ),
      stub_model(Medium,
        :name => "Name"
      )
    ])
  end

  it "renders a list of media" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
  end
end
