
window.onload = function() {
  var uportconnect = window.uportconnect

  const uport = new uportconnect.Connect('BirthDate Attestation', {
    clientId: '2okiuEXwvWzXM1rDngW4VqXmXXiQPJCjZc9',
    network: 'rinkeby',
    signer: uportconnect.SimpleSigner('3e63451942dcde2522e96300564209cf4fc9a0dbfc44e70e25c2552f2b1e65c4')
  })

  var profile = new Vue({
    el: '#js-profile',
    data: {
      seen: false,
      bdExist: false,
      birthdate: '1990-01-01'
    },
    methods: {
      attestation: function() {
        uport.attestCredentials({
          sub: this.address,
          claim: {
            'birthdate': this.birthdate
          },
          exp: new Date().getTime() + 365 * 24 * 60 * 60 * 1000,
        })
      }
    }
  });

  document.getElementById('js-login').addEventListener('click', function(e) {
    e.preventDefault();

    uport.requestCredentials({
      requested: ['name', 'avatar', 'birthdate'],
      notifications: true
    })
    .then((credentials) => {
      console.log(credentials);

      profile.seen = true;
      profile.address = credentials.address;
      profile.image = credentials.avatar.uri;
      profile.name = credentials.name;

      var bdExist = 'birthdate' in credentials;
      profile.bdExist = bdExist;
      if (bdExist) {
        profile.birthdate = credentials.birthdate;
      }
    })
  });

}

