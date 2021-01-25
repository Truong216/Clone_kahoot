import React from 'react';
import './WaitRoom.css';
export default function WaitRoom(){
    return(
        <div className="Container_WaitRoom">
            <div className="display_center">    
                <div>
                    <h1 className="title">You're in !</h1>
                    <h3 className="title_footer">See your nickname on screen ?</h3>
                </div>
            </div>
        </div>
    )
}