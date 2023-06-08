<template>
    <header>
        <div class="header">
      
         <ul class="list">
            <li><router-link to="/">Planner</router-link></li>
            <li><router-link to="/create-meeting">Create Meeting</router-link></li>
            <li><router-link to="/reminder">Set Reminder</router-link></li>
         </ul>
         <div class="user-wrapper" >
            <div @click="toggleProfileMenu" class="profile">
                <span> 
                   MF
                </span>
            </div>
           
          </div>
          <div v-if="profileMenu " class="profile-menu"  @click="toggleProfileMenu">
            <div class="info">
              <div class="right">
                <h4>Musunza Festus</h4>
                <router-link to="/profile-view"><i class="fa-regular fa-user" ></i>View Profile</router-link>
                <hr>
                <div ><i class="fa-solid fa-user-lock"></i>Logout</div>
              </div>
            </div>
          </div> 
          </div>
          
        </header>
    
</template>

<script>

export default {
    data () {
        return {
            available: null,
            profileMenu: null,
           
        }
    },
    methods: {
        toggleAvailable(){
            this.available= !this.available
        },
        toggleProfileMenu(){
            this.profileMenu= !this.profileMenu
        }, 
   

    },

     
}
</script>


<style scoped>
.profile {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background-color: #303030;
    z-index: 999px;
  }
.profile-menu {
    position: absolute;
    border-radius: 10px;
    top: 60px;
    right: 0; 
    width: 200px;
    background-color: #fff;
    box-shadow: 0 4px 0px -1px #79aae6;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  i{
    padding: 10px;
  }
header{
    position: fixed;
     top: 0px;
     max-height: fit-content;
     font-size: medium;
     width: 100%;
     z-index: 999;
}
.header{
    background-color: #fbf9f9;
    border: #aba6a6 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 20px;
   align-items: center;
}
li{
    list-style: none;
    padding: 10px;
}
.list{
    display: flex;
    flex-direction: row;
}
@media only screen and (max-width: 768px) {
  .list{
    display: flex;
    flex-direction: row;
    justify-content: center;
   font-size: smaller;
}
}
</style>