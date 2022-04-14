## Salesforce Lightning Design System

SLDS is a CSS framework that helps provide the look and feel of the Salesforce Lightning experience. It is similar 
to other class based CSS frameworks such as Bootstrap. If you are not familiar with this concept, it ussually 
entails simply applying certain html classes to our html markup to apply predefined styles. 

There are some considerations for where and when you can use SLDS. If you are using the platform version of 
LWC, Aura, or Visualforce then you can use SLDS right away with little fuss because it's baked right in. If 
you are using SLDS with LWC OSS then we need to do a little extra work and import the proper NPM module.

[The SLDS official documentation can be found here!](https://www.lightningdesignsystem.com/)

### Component blueprints

You will find component blueprints on the official documentation. These are predefined styles that can give 
additional functionality and can help you prototype a project quickly. 

```
<span class="slds-badge slds-theme_success">Badge Label</span>
```

>Above is an example of a badge found on the component blueprints section of the official documentation.

### SLDS Grid

Grids are an import concept to understand to allow you to quickly create a layout for your application that 
not only looks good, but also looks good on a variety of screen sizes. 

To create a grid, we must first apply the ```slds-grid``` class to a container component, as shown below. 

```
<div class="slds-grid slds-gutters">
	<div class="slds-col">
		<span>1</span>
	</div>
	<div class="slds-col">
		<span>2</span>
	</div>
	<div class="slds-col">
		<span>3</span>
	</div>
</div>
```
Notice we can also specify standard 16px gutters as well with the ```slds-gutters``` class. We use the ```slds-col``` 
class to specify that this element will represent a column in our grid. In the example above, each column will take up 
equal amount of space. 

> We can have up to 12 columns on a single row.

We can specify column size as well, shown below.

```
<div class="slds-grid slds-gutters">
	<div class="slds-col slds-size_2-of-3">
		<span>1</span>
	</div>
	<div class="slds-col slds-size_1-of-3">
		<span>2</span>
	</div>
</div>
```

In this case, we can see that the first column will take up 2/3 of the available space and the second column only 1/3.

> slds-size is written in a human-friendly way. You could write slds-size_1-of-2 or slds-size_6-of-12!

We can tell our columns to wrap around each other like so:

```
<div class="slds-grid slds-wrap">
	<div class="slds-col slds-size_8-of-12">
		<span>1</span>
	</div>
	<div class="slds-col slds-size_5-of-12">
		<span>1</span>
	</div>
	<div class="slds-col slds-size_5-of-12">
		<span>1</span>
	</div>
</div>
```

In this example, the first and second column equal more than the 12 column max width. So the first column will stand 
on its own row, while the last two columns will be on the same row.

Grids can help us create responsive layouts with minimal effort. Check out the example below!

```
<div class="slds-grid slds-wrap">
	<div class="slds-col slds-size_1-of-1 slds-large-size_8-of-12">
		<span>1</span>
	</div>
	<div class="slds-col slds-size_1-of-1 slds-large-size_4-of-12">
		<span>2</span>
	</div>
</div>
```

In the above example, the default size of these columns are equal. But as soon as the screen size hits 'large' 
they get resized so that the first column takes double the space as the second column. To see a complete listing 
of your options, visit the offical documentation!

### SLDS Icons

SLDS also provides icons we can make use of the give our application additional flair. 

```
<span class="slds-icon_container slds-icon-utility-announcement" title="Description of icon when needed">
	<svg class="slds-icon slds-icon-text-default" aria-hidden="true">
		<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#announcement"></use>
	</svg>
	<span class="slds-assistive-text">Description of icon when needed</span>
</span>
```

We must first use a container element with the ```slds-icon_container``` class, this is for accessibility support. 
The inside of the container will have a svg element with the ```slds-icon``` class and a span element with 
the ```slds-assistive-text``` class. 

The 'use' will house our link to the actual icon we wish to use. For a complete listing of options available, and 
to see all the icons, please refer to the offical documentation.

### Including SLDS in Lightning Web Components OSS

We have multiple options for using SLDS in our LWC OSS app, we will list them here. Remember that the shadow DOM 
will not allow us to cascade styles by default. So we will need to get creative.

1. Use a resource module. 
2. (Your authors preffered method) Use the synthetic shadow dom. This will allow us to cascade our styles to 
children components.

For the first option:
* Create a blank component with just a .css file
  * You can then reference that css file in other components
  * Just simply use the following syntax in your .css file for the component you want to share the styles with = @import ‘my/nameOfComponentThatHasCssFile’;

For the second option:

Let's demo it to get SLDS into our project!
1. npm install @salesforce-ux/design system
2. npm install @lwc/synthetic-shadow
3. Open lwc-services.config.js and update as follows:

```
module.exports = {
    resources: [{ from: 'src/client/resources/', to: 'dist/resources/' },
    {
        from: 'node_modules/@salesforce-ux/design-system/assets',
        to: 'src/SLDS'
    },
    {
        from: 'node_modules/@salesforce-ux/design-system/assets',
        to: 'dist/SLDS'
    }
            ],
            sourceDir: './src/client',
            devServer: {
                proxy: { '/': 'http://localhost:3002' }
            }
};
```

* Here we are specifying a configuration where our SLDS will get copied where we can more easily access it.

> You may need to run ```npm build``` to initialize this and get these folders in their defined location.

4. In our ```index.js``` file we will ```import @lwc/synthetic-shadow;```
5. In our ```index.html``` file we will link our stylesheet ```<link rel="stylesheet" type="text/css" href="/SLDS/styles/salesforce-lightning-design-system.css" />```

We can now cascade our style from parent to children. In this example, we are enabling SLDS for the whole app!

