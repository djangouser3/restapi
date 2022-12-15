import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.esm.browser.js'



Vue.component('loader', {
    template: `
      <div style="display: flex;justify-content: center;align-items: center">
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    `
  })



new Vue({ // create vue
    el: '#app', //root div selector
    data(){ //return models for form input
        return {
            loading: false ,
            form: {
                name: '',
                value: '',
            },
            contacts: [
                
            ]
        }
    },
    computed:{
        canCreate(){//if form is empty don`t let to submit (protect from wrong input)
            return this.form.value.trim() && this.form.name.trim()
        }
    },

    methods: {
        async createContact(){
            const {...contact}  = this.form
            const newContact = await request('/api/contacts','POST', contact)
            //contact is object 
            this.contacts.push(newContact);
            this.form.name  = this.form.value = ''
        },
        markContact(id){
            const contact = this.contacts.find(c=> c.id ===id)
            contact.marked = true;

        },
        removeContact(id){
            this.contacts = this.contacts.filter(c=> c.id !==id )
        }
    },
    async mounted(){ //mounted() to display data after loading 
        this.loading = true;//add loading animation(Vue.component loader) while waiting for response
        this.contacts = await request('/api/contacts')//if in web path will be http://...
        this.loading = false;
        

    }


})

 async function request(url, method="GET", data = null){//requests for server 
    try {
        const headers = {}
        let body
        if(data){
            headers['Content-Type'] = 'application/json' // dealing json
            body = JSON.stringify(data)
        }
        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    }catch(e){
        console.warn('error', e.message)
       
    }
}
