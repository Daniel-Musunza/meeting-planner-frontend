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
                                    placeholder="Your Name" required>
                                <div class="form-control-position">
                                    <i class="ft-user"></i>
                                </div>
                              </fieldset>                     
                              <fieldset class="form-group position-relative has-icon-left">
                                <input type="text"
                                    class="form-control form-control-lg input-lg "
                                   v-model.trim="email"
                                    placeholder="Enter Your Email" required>
                                <div class="form-control-position">
                                    <i class="ft-user"></i>
                                </div>
                              </fieldset>
                              <fieldset class="form-group position-relative has-icon-left">
                                <input type="text"
                                    class="form-control form-control-lg input-lg "
                                   v-model.trim="title"
                                    placeholder="Enter Meeting Title" required>
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

          };
      },
      components: {
        TheLoader
      },
      methods: {
        createMeeting() {
            this.loading = true;
            const data = {
                email: this.email,
            };

            fetch("http://localhost:3444/meeting", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
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