import React, {useState} from 'react';

const Comment = ({comment, comments, setComments, userData}) => {
    const [isEditOn, setIsEditOn] = useState(false)
    const [editedComment, setEditedComment] = useState(comment)

    const lastCommentIndex = comments.length-1;
    const commentIndex = comments.findIndex(c => c.id === comment.id)

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
        <div className="comment-bubble">
            <div style={{fontWeight: "bold"}}>{comment.createdBy.username}</div>
            {!isEditOn ?
                <>
                    <div>{comment.text}</div>
                    {comment.createdBy.username === userData.username && lastCommentIndex === commentIndex?
                        <div>
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
    )
        ;
};

export default Comment;