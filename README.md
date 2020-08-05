# tab-bar
Simple Tab bar for toggling content!

# Initialization
var toggleFunc = new TabToggle({
  'defaultTab': 'tab1'
}).init();

# DOM changes
On source element:
  set Attribute => tn-tab-id
  Ex. <a tn-tab-id="tab1" class="tab comn-tab">Tab 1</a>

On Target element:
  set Attribute => tn-tab-target
  Ex. <div tn-tab-target="tab1"></div>
