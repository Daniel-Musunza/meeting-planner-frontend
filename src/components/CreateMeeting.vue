<template>
    <div class="app-content content">
        <div class="content-wrapper">
            <div class="content-body">
                
                <noscript>
                    <div class="alert alert-icon-left alert-danger alert-dismissible mb-2" id="no-script" role="alert">
                        <span class="alert-icon"><i class="fa fa-info"></i></span>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        For full functionality of this site it is necessary to enable JavaScript.
                        Here are the <a href="">
                            instructions how to enable JavaScript in your web browser</a>.
                    </div>
                </noscript>
                <section class="flexbox-container">
    <div class="col-12 d-flex align-items-center justify-content-center">
        <div class="col-md-5 box-shadow-2 p-0 plain-container">
            <div class="card border-grey border-lighten-3 m-0">
                <div class="card-header border-0">
                    <div class="card-title text-center">
                        <div class="p-1">
                            <h3>Create Meeting</h3>
                         
                                <img src="@/assets/logo.png" alt="Planner"
                                    class="plain-page-logo" width="200px">
                           
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-body login">
                     
                        <form class="form-horizontal form-simple" method="POST" action="">
                            <TheLoader v-if="loading"/>
                            <input type="hidden" name="_token" >     
                            <fieldset class="form-group position-relative has-icon-left">
                                <input type="text"
                                    class="form-control form-control-lg input-lg "
                                   v-model.trim="username"
                                    placeholder="Username" required>
                                <div class="form-control-position">
                                    <i class="ft-user"></i>
                                </div>
                              </fieldset>                     
                              <fieldset class="form-group position-relative has-icon-left">
                                <input type="text"
                                    class="form-control form-control-lg input-lg "
                                   v-model.trim="email"
                                    placeholder="Email" required>
                                <div class="form-control-position">
                                    <i class="ft-user"></i>
                                </div>
                              </fieldset>
                              <fieldset class="form-group position-relative has-icon-left">
                                <input type="text"
                                    class="form-control form-control-lg input-lg "
                                   v-model.trim="title"
                                    placeholder="Title" required>
                              </fieldset>
                              <fieldset class="form-group position-relative has-icon-left">
                                <input type="text"
                                    class="form-control form-control-lg input-lg "
                                   v-model.trim="meeting_id"
                                    placeholder="Meeting ID" required>
                              </fieldset>
                              <fieldset class="form-group position-relative has-icon-left">
                                    <div class="input-container">
                                    <input
                                        :type="showPassword ? 'text' : 'password'"
                                        class="form-control form-control-lg input-lg"
                                        v-model.trim="password"
                                        placeholder="Password"
                                        required
                                    >
                                    <span class="show-password-icon" @click="togglePasswordVisibility">
                                        <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
                                    </span>
                                    </div>
                            </fieldset>

                              <div class="form-group">
                                <h5>Meeting Application</h5> 
                                <select name="field" class="form-control form-control-lg input-lg" required  v-model="meeting_app">          
                                    <option value="zoom">Zoom</option>
                                    <option value="google_meet">Google Meet</option>                  
                                </select>
                              </div>
                        
                            <button type="submit" @click.prevent="createMeeting()" class="btn blue-bg btn-lg btn-block">
                              Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
            </div>
        </div>
    </div>
</template>

<script>
 import TheLoader from "@/components/TheLoader";
 import axios from "axios";
export default {
    name: "clientLogIn",
      data() {
          return {
              email: '',
              title: '',
              username: '',
              errorMsg: '',
              error: null,
              loading: null,
              meeting_app: null,
              password: '',
              showPassword: false

          };
      },
      components: {
        TheLoader
      },
      methods: {
        togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
        },
        createMeeting() {
            this.loading = true;
                const data = {
                    email: this.email,
                };
                console.log(this.username);
                axios
                    .post("http://localhost:3444/meeting", data)
                    .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to create meeting');
                }
                })
                .then((data) => {
                if (data.join_url) {
                    let URL = data.join_url.replace(
                    "https://us04web.zoom.us/j/",
                    "http://localhost:9999/?"
                    ) + `?role=1&name=${this.username}`;
                    console.log(URL);
                    window.location.replace(URL);

                    const newData = {
                    title: this.title,
                    platform: this.meeting_app,
                    link: URL,
                    date: Date.now() + 1,
                    time: '0800',
                    };

                    fetch('http://localhost:3444/addreminder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newData),
                    })
                    .then((response) => {
                        if (response.ok) {
                        console.log('Reminder created:', response.data);
                        } else {
                        throw new Error('Failed to create reminder');
                        }
                    })
                    .catch((error) => {
                        console.error('Error creating reminder:', error);
                    });
                } else {
                    throw new Error('Join URL not found in response');
                }
                })
                .catch((err) => {
                console.error(err);
                })
                .finally(() => {
                this.loading = false;
                });
            },


      }
    
  };
</script>

<style scoped>
.input-container {
  position: relative;
  width: 100%;
}

.input-container .form-control {
  padding-right: 40px; /* Adjust the value as needed */
}

.input-container .show-password-icon {
  position: absolute;
  top: 50%;
  right: 10px; /* Adjust the value as needed */
  transform: translateY(-50%);
  cursor: pointer;
}
.content {
    margin-top: 40px;
    margin-left: 500px;
}
.form-group{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.btn{
    background-color:#9ec6f6;
}
@media only screen and (max-width: 768px) {
    .content {
    margin-top: 40px;
    margin-left: 0;
    padding: 10px;
}
}

</style>