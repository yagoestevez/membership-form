/**
 * Brought to you by Yago Estévez. https://twitter.com/yagoestevez
 */
require( "babel-runtime/regenerator" );
require( './index.html'              );
require( './main.scss'               );
require( 'normalize.css'             );

const launcher        = document.querySelector( '#launcher'        );
const main            = document.querySelector( '#main'            );
const form            = document.querySelector( 'form'             );
const nextBtn         = document.querySelector( '#next-btn'        );
const formContainer   = document.querySelector( '#form'            );
const breadcrumb      = document.querySelector( '#breadcrumb-mark' );
const inputShape      = document.querySelector( '#input-shape'     );
const displayLabel    = document.querySelector( '#label'           );
const nameField       = document.querySelector( '#name'            );
const emailField      = document.querySelector( '#email'           );
const ageField        = document.querySelector( '#number'          );
const proffesionField = document.querySelector( '#dropdown'        );
const acceptTosField  = document.querySelector( '#tos-accept'      );
const tosGroup        = document.querySelector( '#TOS'             );
const fav1Field       = document.querySelector( '#fav1'            );
const commentsField   = document.querySelector( '#comments'        );
const labelMessages   = [
  'Please, type your name below:',
  'Now we need your email address :)',
  'Hope you don\'t mind... Your age, please?',
  'What\'s your current position?',
  'What are your interests as a developer?',
  'Anything else worth sharing?',
  'Have you read and agree with the TOS?'
];
let   currentStep     = 0;

//
//  Typewriter effect. Applied to the label above the input field.
//
const typeWriter = ( message, label, ms = 10 ) => {
  const speed       = ms;
  let   count       = 0;
  label.textContent = '';

  const type = ( ) => {
    label.textContent += message.charAt( count );
    count++;
    return count < message.length ? setTimeout( type, speed ) : true;
  }
  type( );
};

//
//  Displaying errors.
//
const showError = ( msg, field ) => {
  typeWriter( msg, displayLabel );
  field.classList.add( 'warning-bg' );
  currentStep--;
  return false;
}

const hideError = field => {
  field.classList.remove( 'warning-bg' );
  return true;
}

//
//  Validating input fields.
//
const isValidName = ( ) => {
  return nameField.value.match( /\d+/ ) || !nameField.value
    ? showError( 'Sorry. Only real names.', nameField )
    : hideError( nameField )
}

const isValidEmail = ( ) => {
  return !emailField.value.match( /^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+\.[\w-]+$/ ) || !emailField.value
    ? showError( 'Oops! Wrong email address.', emailField )
    : hideError( emailField )
}

const isValidAge = ( ) => {
  return ageField.value > 122 || ageField.value < 1
    ? showError( `Are you sure you're ${ageField.value}...?`, ageField )
    : !ageField.value
      ? showError( 'Oops! Wrong email address.', ageField )
      : hideError( ageField )
}

const isValidProfession = ( ) => {
  return proffesionField.value === 'empty'
    ? showError( `Sorry, we could use an answer... :D`, proffesionField )
    : hideError( proffesionField )
}

const isValidTOS = ( ) => {
  if ( !acceptTosField.checked ) {
    showError( `Sorry. You have to agree to continue.`, tosGroup );
  } else {
    hideError( tosGroup );
    submit( );
  }
}

const finalStep = ( ) => {
  nextBtn.classList.add( 'submit' );
  nextBtn.textContent = '» submit »'
  inputShape.style.visibility = 'hidden'; ////////////////////////////////////////// CHECK
  return true;
}

const submit = ( ) => {
  const mainDisplay = document.querySelector( '#sent-display'       );
  main.classList.add(           'hidden'  );
  mainDisplay.classList.remove( 'hidden'  );
  mainDisplay.classList.add(    'shown'   );
  sayThankYou( );
}

const sayThankYou = ( ) => {
  const headerText  = document.querySelector( '#sent-display-text' );
  setTimeout( ( ) => typeWriter( 'Thank you!', headerText, 50 ), 2500 );
}

const validateField = ( ) => {
  if ( currentStep === 1 ) return isValidName( );
  if ( currentStep === 2 ) return isValidEmail( );
  if ( currentStep === 3 ) return isValidAge( );
  if ( currentStep === 4 ) return isValidProfession( );
  if ( currentStep === 5 ) return true;
  if ( currentStep === 6 ) return finalStep( );
  if ( currentStep === 7 ) return isValidTOS( );
};

//
//  Animating the User Interface.
//
const animateUI = ( ) => {
  const formStep        = 70 * currentStep;
  const breadcrumbStep  = 15 * currentStep;
  formContainer.style.opacity     = '0';
  inputShape.style.transform      = 'translate(-700px,-200px)';
  setTimeout( ( ) => {
    inputShape.style.transform    = 'translate(0px,0px)'
  }, 500 );
  typeWriter( labelMessages[currentStep], displayLabel );
  breadcrumb.style.transform      = `translateX(${breadcrumbStep}px)`;
  setTimeout( ( ) => {
    formContainer.style.opacity   = '1';
    formContainer.style.transform = `translateY(-${formStep}px)`;
    if ( currentStep === 1 ) emailField.focus( );
    if ( currentStep === 2 ) ageField.focus( );
    if ( currentStep === 3 ) proffesionField.focus( );
    if ( currentStep === 4 ) fav1Field.focus( );
    if ( currentStep === 5 ) commentsField.focus( );
    if ( currentStep === 6 ) acceptTosField.focus( );
  }, 700 );
}

//
//  Routing.
//
const nextStep = ( ) => {
  ++currentStep;
  return validateField( ) ? animateUI( ) : false;
};

const launchForm = ( ) => {
  main.classList.remove(     'hidden'   );
  main.classList.add(        'shown'    );
  setTimeout( ( ) => {
    main.style.transition = `
      clip-path 500ms ease-out 300ms,
      opacity 500ms ease-in-out,
      visibility 500ms ease 500ms
    `;
  }, 300 );
  launcher.classList.remove( 'shown'    );
  launcher.classList.add(    'hidden'   );
}

//
//  Handling events.
//
const handleEnterPress = event => {
  const key = event.which || event.keyCode;
  if ( key === 13 ) {
    event.preventDefault( );
    nextStep( );
  }
}

launcher.addEventListener(        'click', ( ) => launchForm( )                   );
nextBtn.addEventListener(         'click', ( ) => nextStep( )                     );

nextBtn.addEventListener(         'keypress', event => handleEnterPress( event )  );
nameField.addEventListener(       'keypress', event => handleEnterPress( event )  );
emailField.addEventListener(      'keypress', event => handleEnterPress( event )  );
ageField.addEventListener(        'keypress', event => handleEnterPress( event )  );
proffesionField.addEventListener( 'keypress', event => handleEnterPress( event )  );
acceptTosField.addEventListener(  'keypress', event => handleEnterPress( event )  );
fav1Field.addEventListener(       'keypress', event => handleEnterPress( event )  );
commentsField.addEventListener(   'keypress', event => handleEnterPress( event )  );

form.addEventListener(            'submit', event => event.preventDefault( )      );

//
//  Deleting default tab's behaviour. It breaks the navigation so badly!
//
window.addEventListener(   'keypress', event => {
  const key = event.which || event.keyCode;
  if ( key === 9 ) event.preventDefault( );
}  );