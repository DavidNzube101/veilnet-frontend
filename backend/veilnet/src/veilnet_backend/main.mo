import Text "mo:base/Text";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Blob "mo:base/Blob";
actor VeilNet {
    // Define the structure for a Post
    type Post = {
        id : Nat;
        content : Text;
        timestamp : Int;
        authorId : Text;
        authorName : Text;
        likeCount : Nat;
        commentCount : Nat;
    };

    // Define the structure for a User
    type User = {
        id : Text;
        name : Text;
        username : Text;
        avatar : ?Text;
        bio : Text;
        postCount : Nat;
        followerCount : Nat;
        followingCount : Nat;
        posts : [Post];
    };

    // Store posts and users in memory
    var posts : [Post] = [];
    var users : [User] = [];

    // Create a new post
    public func createPost(content : Text, authorId : Text, authorName : Text) : async Post {
        let postId = posts.size() + 1;
        let newPost : Post = {
            id = postId;
            content = content;
            timestamp = Time.now();
            authorId = authorId;
            authorName = authorName;
            likeCount = 0;
            commentCount = 0;
        };
        posts := Array.append(posts, [newPost]);
        return newPost;
    };

    // Get all posts
    public query func getPosts() : async [Post] {
        return posts;
    };

    // Get a user's profile
    public query func getUser(userId : Text) : async ?User {
        return Array.find<User>(users, func (u: User) { u.id == userId });
    };
}