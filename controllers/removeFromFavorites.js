const removeFromFavorites = async(userId, favId) => {
    try {
        //TODO implement the logic to remove the notice from the user's favorites
        const removedFavorite = await Favorite.findOneAndRemove({user: userId, notice: favId});
        return removedFavorite;
        } catch (error) {
        throw error;
        }
}

module.exports = removeFromFavorites