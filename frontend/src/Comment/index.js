import React, {useEffect, useState} from 'react';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

const Comment = ({comment, comments, setComments, userData}) => {
    const [isEditOn, setIsEditOn] = useState(false);
    const [editedComment, setEditedComment] = useState(comment);
    const [timeFromCommentCreation, setTimeFromCommentCreation] = useState("");

    const lastCommentIndex = comments.length - 1;
    const commentIndex = comments.findIndex(c => c.id === comment.id)

    useEffect(() => {
        updateTimeFromCommentCreation();
    })

    setInterval(() => {
        updateTimeFromCommentCreation()
    }, 1000*61)

    function updateTimeFromCommentCreation() {
        dayjs.extend(relativeTime);
        setTimeFromCommentCreation(dayjs(comment.createdAt).fromNow());
    }

    function handleEditedCommentChange(value) {
        const editedCommentCopy = {...editedComment};
        editedCommentCopy.text = value;
        setEditedComment(editedCommentCopy);
    }

    function submitEditedComment() {
        fetch(`/api/comments`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(editedComment)
        }).then(response => response.json())
            .then(commentData => {
                const index = comments.findIndex(c => c.id === comment.id);
                const commentsCopy = [...comments];
                commentsCopy[index] = commentData;
                setComments(commentsCopy);
                setIsEditOn(false);
            })
    }

    function handleDeleteComment(comment) {
        fetch(`/api/comments`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE",
            body: JSON.stringify(comment)
        }).then(response => {
            if (response.status === 200) {
                const index = comments.findIndex(c => c.id === comment.id);
                const commentsCopy = [...comments];
                commentsCopy.splice(index, 1);
                setComments(commentsCopy);
            }
        })
    }

    return (
        <>
            <div className="comment-bubble">
                <div style={{fontWeight: "bold"}}>{comment.createdBy.username}</div>
                {!isEditOn ?
                    <>
                        <div>{comment.text}</div>
                        {comment.createdBy.username === userData.username && lastCommentIndex === commentIndex ?
                            <div style={{fontSize: "12px"}}>
                        <span onClick={() => setIsEditOn(true)}
                              style={{cursor: "pointer", color: "blue"}}>edit </span>
                                <span onClick={() => handleDeleteComment(comment)}
                                      style={{cursor: "pointer", color: "red"}}>delete</span>
                            </div>
                            :
                            <></>
                        }
                    </>
                    :
                    <>
                <textarea
                    style={{width: "100%"}}
                    value={editedComment.text}
                    onChange={(event) => handleEditedCommentChange(event.target.value)}
                />
                        <span onClick={() => submitEditedComment(comment)}
                              style={{cursor: "pointer", color: "blue"}}>save </span>
                        <span onClick={() => setIsEditOn(false)}
                              style={{cursor: "pointer", color: "red"}}>cancel</span>
                    </>
                }
            </div>
            <div
                style={{marginTop: "-1.2em", marginLeft: "1.4em", fontSize: "12px"}}
            >
                Posted {timeFromCommentCreation}
            </div>
        </>

    )
        ;
};

export default Comment;