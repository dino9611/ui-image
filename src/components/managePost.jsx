import React, { Component } from 'react';
import {CustomInput} from 'reactstrap'
import Axios from 'axios'
import { API_URL } from '../supports';

class ManagePost extends Component {
    state = {
        listPosts:[],
        addImageFileName:'Select Image....',
        addImageFile:undefined,
        captionadd:'',
        editselected:-1,
        editImageFileName:'Select Image',
        editImageFile:undefined,
        captionEdit:''
      }
    componentDidMount(){
        Axios.get(API_URL+'/post/getpost')
        .then((res)=>{
            this.setState({listPosts:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onAddImageFileChange=(event)=>{
        // console.log(document.getElementById('addImagePost').files[0])
        console.log(event.target.files[0])
        var file=event.target.files[0]
        if(file){
            this.setState({addImageFileName:file.name,addImageFile:event.target.files[0]})
        }else{
            this.setState({addImageFileName:'Select Image...',addImageFile:undefined})
        }
    }
    onCaptionAddChange=(e)=>{
        console.log(e.target.value)
        if(e.target.value.length<=100){
            this.setState({captionadd:e.target.value})
            
        }
    }

    onBtnAddPostClick=()=>{
        if(this.state.addImageFile){
            var formdata=new FormData()
            var Headers={
                headers:
                {'Content-Type':'multipart/form-data'}
            }
            var data={
                caption:this.state.captionadd,
                userId:1
            }
            formdata.append('image',this.state.addImageFile)
            formdata.append('data',JSON.stringify(data))
            Axios.post(API_URL+'/post/addpost',formdata,Headers)
            .then((res)=>{
                console.log(res.data)
                this.setState({listPosts:res.data})
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }else{
            alert('image harus diisi')
        }
    }
    onBtnEditClick=(id)=>{
        this.setState({editselected:id})
    }
    editImageChange=(event)=>{
        var file=event.target.files[0]
        if(file){
            this.setState({editImageFileName:file.name,editImageFile:event.target.files[0]})
        }else{
            this.setState({editImageFileName:'Select Image...',editImageFile:undefined})
        }
    }
    onEditCaptionChange=(e)=>{
        if(e.target.value.length<=100){
            // this.setState({captionEdit:e.target.defaultValue})
            this.setState({captionEdit:e.target.value})
            
        }
    }
    onBtnSaveEditPostClick=(id)=>{
        var captionid='caption'+id
        console.log(this.refs[captionid].value)
        this.setState({captionEdit:this.refs[captionid].value})
        console.log(this.state.captionEdit)
        
        
        if(this.state.editImageFile){
            var formdata=new FormData()
            var Headers={
                headers:
                {'Content-Type':'multipart/form-data'}
            }
            var data={
                caption:this.state.captionEdit,
                userId:1
            }
            console.log(this.state.captionEdit)
            formdata.append('image',this.state.editImageFile)
            formdata.append('data',JSON.stringify(data))
            Axios.put(API_URL+'/post/editpost/'+id,formdata,Headers)
            .then((res)=>{
                this.setState({listPosts:res.data,captionEdit:'',editselected:-1})
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            alert('isi image')

        }
    }
    onBtnDeletePostClick=(id)=>{
        Axios.delete(API_URL+'/post/deletepost/'+id)
        .then((res)=>{
            this.setState({listPosts:res.data})
        }).catch((err)=>{

        })
    }
    renderListPost=()=>{
        return this.state.listPosts.map((item,index)=>{
            if(this.state.editselected===index){
                return(
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td><CustomInput id='addImagePost' type='file' className='overflow-hidden' label={this.state.editImageFileName} onChange={this.editImageChange}  /></td>
                    <td><textarea defaultValue={item.caption} ref={'caption'+item.id}  onChange={this.onEditCaptionChange}/></td>
                    <td>{item.userid}</td>
                    <td><button className='btn btn-danger' onClick={()=>this.setState({editselected:-1})}>Cancel</button></td>
                    <td><button className='btn btn-primary'onClick={()=>this.onBtnSaveEditPostClick(item.id)} >Save</button></td>
                </tr>

                )
            }
            return (
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td><img src={API_URL+item.image} alt={`${item.image}`} width='200'/></td>
                    
                    <td>{item.caption}</td>
                    <td>{item.userid}</td>
                    <td><button className='btn btn-primary'onClick={()=>this.onBtnEditClick(index)} >Edit</button></td>
                    <td><button className='btn btn-danger' onClick={()=>this.onBtnDeletePostClick(item.id)}>delete</button></td>
                </tr>
                
            )
        })
    }
    render() {
        if(this.state.listPosts.length===0){
            return <h1>loading...</h1>
        } 
        return (
            <div>
                <center>
                    <h1>Manage Post</h1>
                    <img src={API_URL+"/post/images/foto.jpg"} alt="perahu.jpg" width='500'/>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>image</th>
                                <th>caption</th>
                                <th>user id</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.renderListPost()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td><CustomInput id='addImagePost' type='file' className='overflow-hidden' label={this.state.addImageFileName} onChange={this.onAddImageFileChange} /></td>
                                <td>
                                    <textarea value={this.state.captionadd} onChange={this.onCaptionAddChange}></textarea>
                                </td>
                                <td></td>
                                <td><input type="button" className='btn btn-success' value='add' onClick={this.onBtnAddPostClick} /></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                    
                </center>
            </div>  
        )
    }
}
 
export default ManagePost;